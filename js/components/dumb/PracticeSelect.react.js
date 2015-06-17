import React from 'react/addons';
import practiceList from '../../../scripts/practiceList.js';

export default class PracticeSelectForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <select className="form-control" {...this.props}>
                {
                    practiceList.map((chapter) => {
                        var chapterId = chapter.chapterNumber;
                        return (
                            <optgroup key={chapterId} label={chapterId + ' ' + chapter.chapterName}>
                                {
                                    chapter.practices.map((practice) => {
                                        var practiceId = practice.practiceId;
                                        return (
                                            <option key={practiceId} value={practiceId}>
                                                {practiceId} - {practice.description}
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
