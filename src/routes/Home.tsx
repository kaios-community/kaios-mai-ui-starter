import { AppBar } from 'mai-ui/dist/components/appbar';
import { Typography } from 'mai-ui/dist/components/Typography';
import { View, ViewContent } from 'mai-ui/dist/components/view';
import { useListNav } from 'mai-ui/dist/hooks';
import { h } from 'preact';
import { AppMenu } from '../components/AppMenu';
import Statusbar from '../components/Statusbar';

function Home() {
  const { selectedId } = useListNav({
    onSelect: (itemId) => console.log(`selected ${itemId}`),
  });

  return (
    <View>
      <Statusbar text="MyApp" />
      <ViewContent>
        <Typography>Hello! Welcome to the MaiUI starter template.</Typography>
      </ViewContent>
      <AppBar
        appMenuContent={<AppMenu />}
        actions={[
          {
            id: 'action1',
            label: 'Action 1',
            actionFn: () => console.log('selected action1'),
          },
          {
            id: 'action2',
            label: 'Action 2',
            actionFn: () => console.log('selected action2'),
          },
          {
            id: 'action3',
            label: 'Action 3',
            actionFn: () => console.log('selected action3'),
          },
        ]}
      />
    </View>
  );
}

export default Home;
