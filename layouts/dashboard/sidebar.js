import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCurrentUser } from '../../contexts/current-user';
import styles from '../../styles/dashboard/layouts/sidebar.module.scss';
import { getPermissions } from '../../utility';

// classnames({
//   [styles.isActive]: router.pathname === '/dashboard'
// })

const DashboardSidebar = () => {
  const router = useRouter();
  const { role } = useCurrentUser();

  return (
    <aside className={classnames(styles.wrapper)}>
      <div className={styles.inner}>
        <ul className="scrollbar">
          <li>
            <Link href="/dashboard">
              <a
                className={router.pathname.includes(
                  '/dashboard' ? 'active' : ''
                )}
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
                  [styles.isActive]: router.pathname.includes(
                    '/dashboard/meetings'
                  )
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
                  [styles.isActive]:
                    router.pathname.includes('/dashboard/library')
                })}
              >
                <span className="icon-book" />
                library
              </a>
            </Link>
          </li>

          {getPermissions(role).includes('find.events') && (
            <li>
              <Link href="/dashboard/events">
                <a
                  className={classnames({
                    [styles.isActive]:
                      router.pathname.includes('/dashboard/events')
                  })}
                >
                  <span className="icon-calendar" />
                  Events
                </a>
              </Link>
            </li>
          )}

          {getPermissions(role).includes('find.articles') && (
            <li>
              <Link href="/dashboard/news">
                <a
                  className={classnames({
                    [styles.isActive]:
                      router.pathname.includes('/dashboard/news')
                  })}
                >
                  <span className="icon-news" />
                  News
                </a>
              </Link>
            </li>
          )}

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

          {getPermissions(role).includes('find.profiles') && (
            <li>
              <Link href="/dashboard/members">
                <a
                  className={classnames({
                    [styles.isActive]:
                      router.pathname.includes('/dashboard/members')
                  })}
                >
                  <span className="icon-profile" />
                  Members
                </a>
              </Link>
            </li>
          )}

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
