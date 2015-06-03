import React from 'react/addons';
import ReactMixin from 'react-mixin';
import practiceList from '../../../scripts/practiceList.js';

export default class PracticeSelectForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {


        return (
                <select className="form-control">
                    {
                        practiceList.map((chapter) => {
                            var chapterId = chapter.chapterNumber;
                            return (
                                <optgroup key={chapterId} label={chapter.chapterName}>
                                    {
                                        chapter.practices.map((practice) => {
                                            var practiceKey = chapterId + '-' + practice.practiceId;
                                            return (
                                                <option key={practiceKey} value={practiceKey}>
                                                    {practice.practiceId} - {practice.description}
                                                </option>
                                            );
                                        })
                                    }
                                </optgroup>
                            );
                        })
                    }
                </select>
        );
    }
}


ReactMixin(PracticeSelectForm.prototype, React.addons.LinkedStateMixin);
