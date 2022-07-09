import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { MyRequests } from "./components/MyRequests";

export default function Example() {
    return (
        <>
            <div className="min-h-screen">
                <Router>
                    <Navbar />

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Routes>
                        {/* <Route path="/about"> */}
                        <Route path="requests" element={<MyRequests />} />
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </Router>
            </div>
        </>
    );
}
