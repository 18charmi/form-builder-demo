import { Outlet } from "react-router-dom";
import Button from "../components/Button";
import Navigation from "../components/Header";
import { useEffect } from "react";
import FormGeneratedPreview from "../components/FormGeneratedPreview";
import { saveFormToList } from "../store/Form.slice";
import { useAppDispatch, useAppSelector } from "../hooks";
import ErrorBoundary from "../pages/ErrorBoundary";

function Root() {
    const list = useAppSelector((state) => state.form.list)
    const dispatch = useAppDispatch()

    // saving a dummy form entry
    useEffect(() => {
        if (list.length === 0) {
            dispatch(saveFormToList());
        }
    }, [list]);

    return <div>
        {/* header */}
        <Navigation />

        <Button>Test btn</Button>
        {/* page content */}
        <main>

            <Outlet />
            <ErrorBoundary>
                <FormGeneratedPreview />
            </ErrorBoundary>
        </main>
    </div>
}

export default Root;