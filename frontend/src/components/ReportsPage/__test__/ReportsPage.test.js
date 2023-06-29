import React from "react";
import { render, screen } from "@testing-library/react";

import ReportsPage from "../ReportsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders reports page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReportsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("reports-datatable")).toBeInTheDocument();
    expect(screen.getByRole("reports-add-button")).toBeInTheDocument();
});
