import Link from 'next/link'
import styles from './page.module.css'

export default function Title() {
  return (
    <main className={styles.main}>
      <div className={styles.title_bar}>
        hogehoge
      </div>

      <div className={styles.button_div}>
        <Link href="/question">
          <button className={styles.start_button}>Start</button>
        </Link>
      </div>
    </main>
  )
}
