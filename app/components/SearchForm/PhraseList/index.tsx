import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IFormState } from '../../../reducers/searchForm';
let Icons = require('react-feather');

let styles = require('./PhraseList.scss');

export interface IProps extends RouteComponentProps<any> {
  searchForm: IFormState,
  addPhrase(phrase: string): void,
  deletePhrase(index: number): void,
  addFile(filename: string): void,
  resetFile(): void
}

interface IState extends RouteComponentProps<any> {
  value: string
}

export class PhraseList extends React.Component<IProps, IState> {
  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(((event.target) as any).value);
    this.setState({value: event.target.value});
  }

  handleAddPhrase(e: Event) {
    console.log('add event',e.target);
    // const value: string = ((e.target) as any).value;
    console.log('Adding phrase: ', this.state.value);
    this.props.addPhrase(this.state.value);
  }

  render() {
    let list: Array<HTMLElement> = [];
    this.props.searchForm.phrases.forEach((phrase: string, index: number) => {
      // list.push(<input type="text" value={phrase}/>)
      let input: HTMLElement = document.createElement('input');
      input.setAttribute('value', phrase);
      input.setAttribute('type', 'text');
      console.log('phrase:', phrase);
      list.push(input);
    });

    return (
      <div>
        {/* <div>{list}</div> */}
        <div className={styles.lastInput}>
          <input type="text" defaultValue={'one more'} onChange={e => this.handleInputChange(e)}/>
        </div>
        <Icons.PlusCircle 
          className={styles.plus}
          onClick={this.handleAddPhrase.bind(this)}
        />
      </div>
    );
  }
}
