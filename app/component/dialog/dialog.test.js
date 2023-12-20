import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import Dialog from "./dialog.component";

test("render Dialog Component", () => {
  const title = "Dialog Test";
  const children = (
    <div>
      <p>Dialog test children</p>
    </div>
  );
  const handleCloseButton = jest.fn();

  const { getByTestId } = render(
    <Dialog title={title} handleCloseButton={handleCloseButton}>
      {children}
    </Dialog>
  );

  const dialogTitle = getByTestId("dialog-title");
  expect(dialogTitle).toBeInTheDocument();

  const dialogButton = getByTestId("dialog-button");
  expect(dialogButton).toBeInTheDocument();

  const dialogChildren = getByTestId("dialog-children");
  expect(dialogChildren).toBeInTheDocument();
});

test("test Close Button function", () => {
  const title = "Dialog Test";
  const children = <p data-testid="test-children">Dialog test children</p>;
  const handleCloseButton = jest.fn();

  const { getByTestId } = render(
    <Dialog title={title} handleCloseButton={handleCloseButton}>
      {children}
    </Dialog>
  );

  const dialogTitle = getByTestId("dialog-title");
  expect(dialogTitle).toHaveTextContent(title);

  const dialogButton = getByTestId("dialog-button");
  expect(dialogButton).toBeInTheDocument();

  const dialogChildren = getByTestId("dialog-children");
  const testChildren = getByTestId("test-children");
  expect(dialogChildren).toContainElement(testChildren);

  fireEvent.click(dialogButton);
  waitFor(() => {
    expect(screen.queryByTestId("dialog-container")).toBeNull();
  });
});
