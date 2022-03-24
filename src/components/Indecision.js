import React from "react";
import Action from "./Action";
import AddOption from "./AddOption";
import Header from "./Header";
import Options from "./Options";
import OptionModal from "./OptionModal";

export default class Indecision extends React.Component {
  state = {
    options: [],
    selectedOption: undefined,
  };

  componentDidMount = () => {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options: options }));
      }
    } catch {
      //Do nothing
    }
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
      console.log("saving data");
    }
  };

  componentWillUnmount = () => {};

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleDeleteOption = (option) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((e) => option !== e),
    }));
  };

  handePick = () => {
    const randomNam = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNam];

    this.setState(() => ({
      selectedOption: option,
    }));
  };

  handleOkay = () => {
    this.setState(() => ({
      selectedOption: undefined,
    }));
  };

  onFormSubmit = (option) => {
    if (!option) {
      return "Enter a valid option";
    } else if (this.state.options.indexOf(option) > -1) {
      return "Already have this option";
    }
    this.setState((prevState) => ({
      options: prevState.options.concat([option]),
    }));
  };

  render() {
    const title = "Indecision";
    const subtitle = "Put your life in a hands of computer."; //This is main component and it is parent and within it are nested another child components.

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <div className='container' >
          <Action
            hasOptions={this.state.options.length > 0}
            handePick={this.handePick}
          />
          <div className='wiget'>
          <Options
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            handleDeleteOption={this.handleDeleteOption}
          />
          <AddOption onFormSubmit={this.onFormSubmit} />
          </div>
         
        </div>

        <OptionModal
          selectedOption={this.state.selectedOption}
          handleOkay={this.handleOkay}
        />
      </div>
    );
  }
}
