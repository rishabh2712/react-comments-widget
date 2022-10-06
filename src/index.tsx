import App from "./App";
import { CommentsProvider } from './hooks/use-comments-store'
import ReactDOM from "react-dom";

ReactDOM.render(
    <CommentsProvider>
        <App />
    </CommentsProvider>, document.getElementById("root")
);
