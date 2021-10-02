import styles from '../../styles/dashboard/layouts/sidebar.module.scss';
import classnames from 'classnames';
import Link from 'next/link';

const DashboardSidebar = () => {
  return (
    <aside className={styles.wrapper}>
      <div className={styles.inner}>
        <ul>
          <li>
            <Link href="/dashboard">
              <a>
                <span className="icon-dashboard" />
                Dashboard
              </a>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/meeting">
              <a>
                <span
                  className={classnames('icon-meeting', styles.large__icon)}
                />
                Meeting room
              </a>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/library">
              <a>
                <span className="icon-book" />
                library
              </a>
            </Link>
          </li>

          <li>
            <a href="#">
              <span className="icon-shop" />
              Shop
            </a>
          </li>

          <li>
            <Link href="/dashboard/payments">
              <a>
                <span className="icon-card" />
                Payments
              </a>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/settings">
              <a>
                <span className="icon-settings" />
                Settings
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
