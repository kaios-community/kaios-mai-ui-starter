import { SelectableBase } from 'mai-ui/dist/components/SelectableBase';
import { Typography } from 'mai-ui/dist/components/Typography';
import { useView } from 'mai-ui/dist/contexts';
import { SelectablePriority } from 'mai-ui/dist/enums';
import { useListNav } from 'mai-ui/dist/hooks';
import { h } from 'preact';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import { useSettings } from '../contexts/SettingsProvider';
import styles from './AppMenu.module.css';

interface AppMenuProps {
  onClose?: () => void;
}

export function AppMenu(props: AppMenuProps): h.JSX.Element {
  const { settings } = useSettings();
  const view = useView();

  useEffect(() => {
    view.setHomeMenuOpen(true);
    return () => view.setHomeMenuOpen(false);
  }, []);

  function handleSelect(id?: string): void {
    console.log('select', id);

    let pageRoute = '/';

    switch (id) {
      case 'home':
        pageRoute = '/';
        break;
      case 'settings':
        pageRoute = '/settings/display';
        break;
    }

    route(pageRoute);
  }

  const { selectedId } = useListNav({
    priority: SelectablePriority.Medium,
    onSelect: handleSelect,
  });

  return (
    <div className={styles.root}>
      <Typography type="bodyLarge">MyApp</Typography>
      <div className={styles.list}>
        <SelectableBase
          className={styles.row}
          priority={SelectablePriority.Medium}
          id="home"
          shortcut="1"
          selected={selectedId === 'home'}
        >
          <span>1</span>
          Home
        </SelectableBase>
        <SelectableBase
          className={styles.row}
          priority={SelectablePriority.Medium}
          id="settings"
          shortcut="2"
          selected={selectedId === 'settings'}
        >
          <span>2</span>
          Settings
        </SelectableBase>
      </div>
    </div>
  );
}
