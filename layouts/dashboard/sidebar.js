import styles from '../../styles/dashboard/layouts/sidebar.module.scss';
import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

const DashboardSidebar = () => {
  const router = useRouter();

  return (
    <aside className={styles.wrapper}>
      <div className={styles.inner}>
        <ul>
          <li>
            <Link href="/dashboard">
              <a
                className={classnames({
                  [styles.isActive]: router.pathname === '/dashboard'
                })}
              >
                <span className="icon-dashboard" />
                Dashboard
              </a>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/meetings">
              <a
                className={classnames({
                  [styles.isActive]: router.pathname === '/dashboard/meetings'
                })}
              >
                <span
                  className={classnames('icon-meeting', styles.large__icon)}
                />
                Meeting room
              </a>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/library">
              <a
                className={classnames({
                  [styles.isActive]: router.pathname === '/dashboard/library'
                })}
              >
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
              <a
                className={classnames({
                  [styles.isActive]: router.pathname === '/dashboard/payments'
                })}
              >
                <span className="icon-card" />
                Payments
              </a>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/settings">
              <a
                className={classnames({
                  [styles.isActive]: router.pathname === '/dashboard/settings'
                })}
              >
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
