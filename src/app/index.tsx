import { TrueSheet } from '@lodev09/react-native-true-sheet';
import { Camera, Map } from '@maplibre/maplibre-react-native';
import { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const MAP_STYLE = 'https://demotiles.maplibre.org/style.json';

export default function Index() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>
        Open the non-draggable sheet and pinch or pan the map vertically. On Android the sheet takes
        over the gesture once the finger moves past the touch slop, so the map stops zooming or
        panning.
      </Text>
      <MapSheetButton draggable={false} />
      <MapSheetButton draggable />
    </View>
  );
}

function MapSheetButton({ draggable }: { draggable: boolean }) {
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
          <Pressable style={styles.close} onPress={() => sheet.current?.dismiss()}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
        </GestureHandlerRootView>
      </TrueSheet>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  button: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#208AEF',
  },
  close: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  closeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
