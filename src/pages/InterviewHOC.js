import React from 'react'
import { useSelector } from 'react-redux'
import InterviewerTask from './InterviewerTask'
import Interview from './Interview'
const InterviewHOC = () => {
    const { staff } = useSelector(state => state.staff)
    let children;
    switch (staff.role) {
        case 'Interviewer':
            children = <InterviewerTask />
            break;
        case 'HR Staff':
            children = <Interview />
            break;
        default:
            children = <Interview />
            break;
    }
    return children
}

export default InterviewHOC