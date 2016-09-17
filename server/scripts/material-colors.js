/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "getMaterialColor" }] */
'use strict';

var MATERIAL_COLORS = '#000000, #004d40, #006064, #00695c, #00796b, #00838f, #00897b, #0091ea, #009688, #0097a7, #00acc1, #00b0ff, #00b8d4, #00bcd4, #00bfa5, #00c853, #00e5ff, #00e676, #01579b, #0277bd, #0288d1, #039be5, #03a9f4, #0d47a1, #1565c0, #18ffff, #1976d2, #1a237e, #1b5e20, #1de9b6, #1e88e5, #212121, #2196f3, #263238, #26a69a, #26c6da, #283593, #2962ff, #2979ff, #29b6f6, #2e7d32, #303f9f, #304ffe, #311b92, #33691e, #37474f, #388e3c, #3949ab, #3d5afe, #3e2723, #3f51b5, #40c4ff, #424242, #42a5f5, #43a047, #448aff, #4527a0, #455a64, #4a148c, #4caf50, #4db6ac, #4dd0e1, #4e342e, #4fc3f7, #512da8, #536dfe, #546e7a, #558b2f, #5c6bc0, #5d4037, #5e35b1, #607d8b, #616161, #6200ea, #64b5f6, #64dd17, #64ffda, #651fff, #66bb6a, #673ab7, #689f38, #69f0ae, #6a1b9a, #6d4c41, #757575, #76ff03, #78909c, #795548, #7986cb, #7b1fa2, #7c4dff, #7cb342, #7e57c2, #80cbc4, #80d8ff, #80deea, #81c784, #81d4fa, #827717, #82b1ff, #84ffff, #880e4f, #8bc34a, #8c9eff, #8d6e63, #8e24aa, #90a4ae, #90caf9, #9575cd, #9c27b0, #9ccc65, #9e9d24, #9e9e9e, #9fa8da, #a1887f, #a5d6a7, #a7ffeb, #aa00ff, #ab47bc, #ad1457, #aed581, #aeea00, #afb42b, #b0bec5, #b2dfdb, #b2ebf2, #b2ff59, #b388ff, #b39ddb, #b3e5fc, #b71c1c, #b9f6ca, #ba68c8, #bbdefb, #bcaaa4, #bdbdbd, #bf360c, #c0ca33, #c2185b, #c51162, #c5cae9, #c5e1a5, #c62828, #c6ff00, #c8e6c9, #ccff90, #cddc39, #ce93d8, #cfd8dc, #d1c4e9, #d32f2f, #d4e157, #d50000, #d500f9, #d7ccc8, #d81b60, #d84315, #dce775, #dcedc8, #dd2c00, #e040fb, #e0e0e0, #e0f2f1, #e0f7fa, #e1bee7, #e1f5fe, #e3f2fd, #e53935, #e57373, #e64a19, #e65100, #e6ee9c, #e8eaf6, #e8f5e9, #e91e63, #ea80fc, #ec407a, #eceff1, #ede7f6, #eeeeee, #eeff41, #ef5350, #ef6c00, #ef9a9a, #efebe9, #f06292, #f0f4c3, #f1f8e9, #f3e5f5, #f44336, #f4511e, #f48fb1, #f4ff81, #f50057, #f57c00, #f57f17, #f5f5f5, #f8bbd0, #f9a825, #f9fbe7, #fafafa, #fb8c00, #fbc02d, #fbe9e7, #fce4ec, #fdd835, #ff1744, #ff3d00, #ff4081, #ff5252, #ff5722, #ff6d00, #ff6e40, #ff6f00, #ff7043, #ff80ab, #ff8a65, #ff8a80, #ff8f00, #ff9100, #ff9800, #ff9e80, #ffa000, #ffa726, #ffab00, #ffab40, #ffab91, #ffb300, #ffb74d, #ffc107, #ffc400, #ffca28, #ffcc80, #ffccbc, #ffcdd2, #ffd180, #ffd54f, #ffd600, #ffd740, #ffe082, #ffe0b2, #ffe57f, #ffea00, #ffeb3b, #ffebee, #ffecb3, #ffee58, #fff176, #fff3e0, #fff59d, #fff8e1, #fff9c4, #fffde7, #ffff00, #ffff8d, #ffffff'.split(', ').sort();

var MATERIAL_COLORS_DECIMAL = MATERIAL_COLORS.slice(0);

for (var i = 0, l = MATERIAL_COLORS_DECIMAL.length; i < l; i++) {
  var n = MATERIAL_COLORS_DECIMAL[i].substring(1);
  n = parseInt(n, 16);
  MATERIAL_COLORS_DECIMAL[i] = n;
}

/**
 * Get nearest material color for an hex color string
 * @param  {string} hexColor hex color to transform
 * @return {string}          material hex color
 */
function getMaterialColor(hexColor) {
  hexColor = hexColor.toLowerCase();
  var color = hexColor;
  color = color.substring(1);
  color = parseInt(color, 16);

  for (var i = 0, m = MATERIAL_COLORS_DECIMAL, l = m.length; i < l; i++) {
    if (color > m[i] && color < m[i + 1]) {
      return MATERIAL_COLORS[i];
    }
  }
}
