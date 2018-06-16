import update from 'immutability-helper';

/**
 * Adds the specified widget to the specified position in the layout.
 */
export function addWidget(layout, rowIndex, columnIndex, widgetName, data) {
  const d = data || {};

  return update(layout, {
    rows: {
      [rowIndex]: {
        columns: {
          [columnIndex]: {
            widgets: {
              $push: [{
                key: widgetName,
                data: d,
              }],
            },
          },
        },
      },
    },
  });
}


export function editWidget(layout, rowIndex, columnIndex, widgetIndex, data) {
  const d = data || {};
  console.log(layout, rowIndex, columnIndex, widgetIndex, d);
  return update(layout, {
    rows: {
      [rowIndex]: {
        columns: {
          [columnIndex]: {
            widgets: {
              [widgetIndex]: {
                data: {
                  $set: d,
                },
              },
            },
          },
        },
      },
    },
  });
}

/**
 * Removes the widget at a specified index.
 */
export function removeWidget(layout, rowIndex, columnIndex, widgetIndex) {
  return update(layout, {
    rows: {
      [rowIndex]: {
        columns: {
          [columnIndex]: {
            widgets: {
              $splice: [
                [widgetIndex, 1],
              ],
            },
          },
        },
      },
    },
  });
}

/**
 * Moves a widget from column to column.
 */
export function moveWidget(layout, initialLocation, destination, widgetName) {
  /* eslint max-len: "off" */
  const data = layout.rows[initialLocation.rowIndex].columns[initialLocation.columnIndex].widgets[initialLocation.widgetIndex].data;
  const removedLayout = removeWidget(layout, initialLocation.rowIndex, initialLocation.columnIndex, initialLocation.widgetIndex);
  const movedLayout = addWidget(removedLayout, destination.rowIndex, destination.columnIndex, widgetName, data);
  return movedLayout;
}

/**
 * Sorts a widget in the same column.
 */
export function sortWidget(layout, initialLocation, destination, widgetName) {
  const data = layout.rows[initialLocation.rowIndex].columns[initialLocation.columnIndex].widgets[initialLocation.widgetIndex].data;

  return update(layout, {
    rows: {
      [initialLocation.rowIndex]: {
        columns: {
          [initialLocation.columnIndex]: {
            widgets: {
              $splice: [
                [initialLocation.widgetIndex, 1],
                [destination.widgetIndex, 0, {
                  key: widgetName,
                  data: data,
                }],
              ],
            },
          },
        },
      },
    },
  });
}
