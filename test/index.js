const testsContext = require.context('.', true, /spec\.js$/);
tui.util.forEachArray(testsContext.keys(), testsContext);
