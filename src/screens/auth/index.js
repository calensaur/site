import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { Button, Input } from '../../components'
import { auth } from '../../core/auth'

import styles from './styles.module.css'

function Auth() {
  const [code, setCode] = useState(false)
  const { push } = useRouter()

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: '',
      code: '',
    },
    validate: values => {
      let errors = {}

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Некорректный email'
      }

      return errors
    },
    onSubmit: async values => {
      if (!values.code) {
        await auth.sendConfirmCode({ email: values.email }, () => {
          setCode(true)
        })
      } else {
        await auth.confirm({ email: values.email, code: values.code }, () => {
          push('/me')
        })
      }
    },
    validateOnBlur: false,
  })

  return (
    <section className={styles.Section}>
      <h1 className={styles.Title}>Войти</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {code ? (
            <>
              <Input
                id="code"
                label="Код"
                type="tel"
                name="code"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="1234"
                className={styles.Input}
                maxLength={4}
              />
              <Button isFullWidth isPrimary type="submit">
                Подтвердить
              </Button>
            </>
          ) : (
            <>
              <Input
                id="email"
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="name@example.com"
                className={styles.Input}
                error={errors.email && touched.email && errors.email}
              />
              <Button isFullWidth isPrimary type="submit">
                Войти через почту
              </Button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

export default Auth