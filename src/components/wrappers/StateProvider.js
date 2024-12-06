import React, {Component} from 'react';
import {FILTER_ALL} from '../../services/filter';
import {MODE_CREATE, MODE_NONE} from '../../services/mode';
import {wrapChildrenWith} from '../../util/common';

class StateProvider extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            mode: MODE_CREATE,
            filter: FILTER_ALL,
            list: []
        }
    }

    render() {
        let children = wrapChildrenWith(this.props.children, {
            data: this.state,
            actions: {
                addNew: this.addNew.bind(this),
                changeFilter: this.changeFilter.bind(this),
                changeStatus: this.changeStatus.bind(this),
                changeMode: this.changeMode.bind(this),
                setSearchQuery: this.setSearchQuery.bind(this),
                editTask: this.editTask.bind(this),
                deleteTask: this.deleteTask.bind(this)
            }
        });

        return <div>{children}</div>;
    }

    addNew(task) {
        const updatedList = [
            ...this.state.list,
            {
                ...task,
                id: this.state.list.length + 1,
                createdAt: new Date().toISOString()
            }
        ];
        this.setState({list: updatedList});
    }

    changeFilter(filter) {
        this.setState({filter});
    }

    changeStatus(itemId, newStatus) {
        const updatedList = this.state.list.map(item => {
            if (item.id === itemId) {
                return {...item, status: newStatus};
            }
            return item;
        });
        this.setState({list: updatedList});
    }

    changeMode(mode = MODE_NONE) {
        this.setState({mode});
    }

    setSearchQuery(text) {
        this.setState({query: text || ''});
    }

    editTask(updatedTask) {
        const updatedList = this.state.list.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        );
        this.setState({ list: updatedList });
    }

    deleteTask(taskId) {
        const updatedList = this.state.list.filter(task => task.id !== taskId);
        this.setState({ list: updatedList });
    }
}

export default StateProvider;
