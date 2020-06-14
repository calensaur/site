import React from 'react'
import Link from 'next/link'
import cx from 'classnames'

import styles from './styles.module.css'

const types = [
  {
    type: 'films',
    title: 'Кино',
  },
  {
    type: 'games',
    title: 'Игры',
  },
  {
    type: 'series',
    title: 'Сериалы',
  },
]

function ReleaseTypeChooser({ type, month, year }) {
  return (
    <ul className={styles.ReleaseTypeChooser}>
      {types.map(({ type: t, title }) => (
        <li key={t}>
          <Link href={`/${t}/[date]`} as={`/${t}/${month.eng}-${year}`}>
            <a
              className={cx({
                [styles.isActive]: type === t,
              })}
            >
              {title}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ReleaseTypeChooser
