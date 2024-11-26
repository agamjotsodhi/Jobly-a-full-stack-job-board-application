import { Button } from 'reactstrap';
import './static/ApplyButton.css';

const ApplyButton = ({ success, apply }) => {
    return (
        <div>
            {success ? (
                <Button color={'success'}>Applied!</Button>
            ) : (
                <Button className="ApplyButton" onClick={apply}>
                    Apply
                </Button>
            )}
        </div>
    );
};

export default ApplyButton;