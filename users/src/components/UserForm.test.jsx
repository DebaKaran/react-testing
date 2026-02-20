import { render, screen } from "@testing-library/react"
import UserForm from "./UserForm"
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";

test('it should shows two inputs and a button', () => { 
    //render the component
    render(<UserForm onUserAdd={() => {}}/>)

    //Manipulate the component or find an element in it
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    //Assertion - make sure the component is doing
    //what it expect it to do
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
 });

 test('it calls onUserAdd when the form is submitted', async () => {
    //Not the best implemenation

    const argList = [];
    const callback = (...args) => {
        argList.push(args);
    }

    //render the component
    render(<UserForm onUserAdd={callback}/>)

    //Manipulate the component or find an element in it
    const [nameInput, emailInput] = screen.getAllByRole('textbox');

    const user = userEvent.setup()   // THIS LINE IS REQUIRED

    //Simulate typing in a name
    await user.click(nameInput);
    await user.keyboard("Deba")

    //Simulate typing in an email
    await user.click(emailInput);
    await user.keyboard("deba@deba.com");

    //find the button
    const button = screen.getByRole('button');

    //simulate clicking the button
    await user.click(button);
    //Assertion - make sure the 'onUserAdd' gets called with email and name
    expect(argList).toHaveLength(1);
    expect(argList[0][0]).toEqual({
        name: "Deba",
        email: "deba@deba.com"
    });
    //what it expect it to do
 });