import cx from 'classnames'
import { toast, Slide } from 'react-toastify'
import compareAsc from 'date-fns/compareAsc'
import { useExpect } from 'features/releases/use-expect'
import { ReleaseInList } from 'types/common'

import styles from './styles.module.css'

interface Props {
  release: ReleaseInList
  className?: string
}

function ExpectButton({ release, className }: Props) {
  const { expect, isExpected } = useExpect(release)

  const isActual = compareAsc(new Date(), new Date(release.released)) <= 0

  function renderIcon() {
    const onOff = isExpected ? 'on' : 'off'

    if (isActual) {
      return (
        <img width="20" height="20" src={`/icons/fire-${onOff}.svg`} alt="" />
      )
    }

    return (
      <img width="20" height="20" src={`/icons/star-${onOff}.svg`} alt="" />
    )
  }

  function renderTooltip() {
    if (isActual) {
      return isExpected ? 'Отписаться от релиза' : 'Следить за релизом'
    }

    return isExpected ? 'Удалить из избранного' : 'Добавить в избранное'
  }

  function toastMessage() {
    if (isActual) {
      return isExpected
        ? `Вы отписались от «${release.title}»`
        : `Вы подписались на «${release.title}»`
    }

    return isExpected
      ? `Вы удалили «${release.title}» из избранного`
      : `Вы добавили «${release.title}» в избранное`
  }

  return (
    <button
      aria-label={renderTooltip()}
      className={cx(styles.Button, className)}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        expect()
        toast(toastMessage(), {
          autoClose: 2400,
          className: styles.Toast,
          transition: Slide,
        })
      }}
    >
      {renderIcon()}
    </button>
  )
}

export default ExpectButton