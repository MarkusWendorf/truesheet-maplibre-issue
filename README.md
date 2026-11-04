# TrueSheet + MapLibre: non-draggable sheet steals map gestures (Android)

Expo SDK 58 default template with `@lodev09/react-native-true-sheet` 4.0.1 and `@maplibre/maplibre-react-native` 11.5.

## Run

```sh
npm install
npm run android
```

## Reproduce

1. Tap **Open map sheet (draggable=false)**.
2. Pinch to zoom, or pan the map vertically.

**Expected:** the map zooms and pans; the sheet can't be dragged.

**Actual:** once the first finger moves vertically past the touch slop, the sheet takes over the gesture and the map stops zooming or panning. Gestures that start sideways keep working, so pinch works only some of the time.

`TrueSheetCoordinatorLayout.onInterceptTouchEvent` drags from content that can't scroll vertically without checking whether the sheet is draggable. iOS isn't affected.

The **draggable=true** button shows the same map in a draggable sheet for comparison.
