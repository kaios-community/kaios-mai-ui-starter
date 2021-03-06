import { AppBar } from 'mai-ui/dist/components/appbar';
import { Input, Select, ToggleRow } from 'mai-ui/dist/components/form';
import { Typography } from 'mai-ui/dist/components/Typography';
import { View, ViewTab, ViewTabBar } from 'mai-ui/dist/components/view';
import { SelectablePriority } from 'mai-ui/dist/enums';
import { useListNav } from 'mai-ui/dist/hooks';
import { h, VNode } from 'preact';
import { route } from 'preact-router';
import { AppMenu } from '../components/AppMenu';
import Statusbar from '../components/Statusbar';
import { useSettings } from '../contexts/SettingsProvider';
import { Settings, TextSize, Theme } from '../models';
import { ThemeConfig, themes } from '../themes';

type Props = {
  tabId: 'display' | 'theme';
};

export default function AppSettings({ tabId }: Props): VNode {
  const { settings, setSettings, setSetting } = useSettings();

  const { selectedId } = useListNav({
    priority: SelectablePriority.Low,
    updateRouteOnChange: false,
  });

  function handleSettingSelect<T extends keyof Settings>(key: T, value: Settings[T]): void {
    if (key === 'theme') {
      // We want to use the theme's original accent color
      const theme = themes.find((a) => a.id === value) as ThemeConfig;
      setSettings({
        ...settings,
        theme: value as Theme,
        accentColor: theme.values.appAccentColor.slice(1),
      });
    } else {
      setSetting(key, value);
    }
  }

  return (
    <View>
      <Statusbar text="Settings" />
      <ViewTabBar
        tabs={[
          { id: 'display', label: 'display' },
          { id: 'tab2', label: 'tab2' },
        ]}
        selectedId={tabId}
        onChange={(tabId) => route(`/settings/${tabId}`, true)}
      />
      <ViewTab tabId="display" activeTabId={tabId}>
        <Select
          label="Base Theme"
          value={settings.theme}
          options={[
            { id: Theme.Light, label: 'Light' },
            { id: Theme.Dark, label: 'Dark' },
          ]}
          selectable={{
            id: 'theme',
            selected: selectedId === 'theme',
          }}
          onChange={(id): void => handleSettingSelect('theme', id)}
        />
        <Input
          label="Accent Color (hex)"
          value={settings.accentColor}
          size={6}
          selectable={{
            id: 'accentColor',
            selected: selectedId === 'accentColor',
          }}
          onChange={(value) =>
            value.match(/[0-9a-fA-F]{6}/) && handleSettingSelect('accentColor', value)
          }
        />
        <ToggleRow
          label="App Bar Accent"
          value={settings.appBarAccent}
          selectable={{
            id: 'appBarAccent',
            selected: selectedId === 'appBarAccent',
          }}
          onChange={(value): void => handleSettingSelect('appBarAccent', value)}
        />
        <Select
          label="Text Size"
          value={settings.textSize}
          options={[
            { id: TextSize.Smallest, label: 'Smallest' },
            { id: TextSize.Small, label: 'Small' },
            { id: TextSize.Medium, label: 'Medium' },
            { id: TextSize.Large, label: 'Large' },
            { id: TextSize.Largest, label: 'Largest' },
          ]}
          selectable={{
            id: 'textSize',
            selected: selectedId === 'textSize',
          }}
          onChange={(id): void => handleSettingSelect('textSize', id)}
        />
      </ViewTab>
      <ViewTab tabId="tab2" activeTabId={tabId}>
        <Typography>Another tab</Typography>
      </ViewTab>
      <AppBar appMenuContent={<AppMenu />} />
    </View>
  );
}
