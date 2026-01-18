import { NavLink } from 'react-router-dom'
import Icon from './Icons'

const tabs = [
  { path: '/', icon: 'flame', label: 'Home' },
  { path: '/people', icon: 'contact', label: 'People' },
  { path: '/history', icon: 'heart', label: 'History' }
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `bottom-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <Icon name={tab.icon} size={24} />
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
