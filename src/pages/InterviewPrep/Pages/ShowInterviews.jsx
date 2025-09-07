import React from 'react'
import { fetchAllInterviews } from '../IntervewReponses/InterviewerResponse';

const ShowInterviews = () => {
    const [interviews, setInterviews] = useState([]);
    
    useEffect(() => {
        const fetchInterviews = async () => {
            const allInterviews = await fetchAllInterviews();
            setInterviews(allInterviews)
        }
        fetchInterviews();
    }, [])
    
  return (
    <div>ShowInterviews</div>
  )
}

export default ShowInterviews