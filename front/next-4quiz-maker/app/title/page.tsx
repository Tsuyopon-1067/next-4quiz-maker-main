import Image from 'next/image'
import styles from './page.module.css'

export default function Title() {
  return (
    <main className={styles.main}>
      <div className={styles.title_bar}>
        hogehoge
      </div>

      <div className={styles.button_div}>
        <button className={styles.start_button}>Start</button>
      </div>
    </main>
  )
}
