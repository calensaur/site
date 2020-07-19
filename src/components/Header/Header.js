import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MobileHeader from './MobileHeader'
import Button from '../Button'
import { auth, UserContext } from '../../core/auth'

import styles from './Header.module.css'

function Header({ hasBack }) {
  const { back, push } = useRouter()
  const { user, updateUser } = useContext(UserContext)

  console.log(user)

  return (
    <>
      <header className={styles.Header} aria-label="header">
        <div className={styles.Logo}>
          {hasBack && (
            <button
              className={styles.Back}
              onClick={() => {
                back()
              }}
            >
              <img src="/icons/back.svg" alt="" />
            </button>
          )}
          <Link href="/">
            <a className={styles.DesktopLogo} data-text="released">
              released
            </a>
          </Link>
          <Link href="/">
            <a className={styles.MobileLogo}>
              <img src="/images/logo.png" alt="" />
            </a>
          </Link>
        </div>
        <div className={styles.Right}>
          <Link href="/whats-new">
            <a>Что нового?</a>
          </Link>
          <Link href="/archive">
            <a>Вышедшее</a>
          </Link>
          {user ? (
            <Button
              className={styles.Subscribe}
              isPrimary
              onClick={() => {
                auth.logout(() => {
                  updateUser(null)
                })
              }}
            >
              Выйти
            </Button>
          ) : (
            <Button
              className={styles.Subscribe}
              isPrimary
              onClick={() => {
                push('/auth')
              }}
            >
              Войти
            </Button>
          )}
        </div>
      </header>
      <MobileHeader />
    </>
  )
}

export default Header
