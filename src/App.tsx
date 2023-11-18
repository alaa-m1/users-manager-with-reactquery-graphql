import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ReactQueryProvider } from "utils/reactQuery/ReactQueryProvider";
import { appRouter } from "router";

function App() {
  return (
    <ReactQueryProvider>
      <RouterProvider router={appRouter} />
    </ReactQueryProvider>
  );
}

export default App;
