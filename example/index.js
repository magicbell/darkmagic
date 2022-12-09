import { jsx as _jsx } from "react/jsx-runtime";
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
function App() {
    return _jsx("div", { id: "target", children: "example app" });
}
ReactDOM.render(_jsx(App, {}), document.getElementById('root'));
