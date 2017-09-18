import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IFormState } from '../../reducers/searchForm';
import { FileInput } from './FileInput';

let styles = require('./SearchForm.scss');

export interface IProps extends RouteComponentProps<any> {
  searchForm: IFormState
}

export class SearchForm extends React.Component<IProps> {
  render() {
    return (
      <div className={styles.formColumn}>
        <div className={styles.formHeader}>
          <FileInput filename={this.props.searchForm.filename}/>
        </div>
        <div className={styles.formBody}>
          <div className={styles.formTitle}>Phrases</div>
        </div>
      </div>
    );
  }
}


// class NameForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: ''};

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input type="text" value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }
