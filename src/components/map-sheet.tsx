import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { Camera, Map } from '@maplibre/maplibre-react-native';
import { useRef } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const MAP_STYLE = 'https://demotiles.maplibre.org/style.json';

export function MapSheetButton({ draggable }: { draggable: boolean }) {
  const sheet = useRef<TrueSheet>(null);

  return (
    <>
      <Pressable style={styles.button} onPress={() => sheet.current?.present()}>
        <Text style={styles.buttonText}>Open map sheet (draggable={String(draggable)})</Text>
      </Pressable>

      <TrueSheet ref={sheet} detents={[0.9]} draggable={draggable} style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Map style={{ flex: 1 }} mapStyle={MAP_STYLE}>
            <Camera initialViewState={{ center: [10, 54], zoom: 4 }} />
          </Map>
        </GestureHandlerRootView>
      </TrueSheet>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#208AEF',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
