import { Input, Button, Form, FormGroup, Col, Container } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import './styles/SearchForm.css';

const SearchForm = ({ getSearchTerm }) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            searchTerm: ''
        }
    });

    const onSubmit = (data) => {
        getSearchTerm(data);
        reset();
    };
    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup row>
                        <Col
                            md={{
                                offset: 3,
                                size: 6
                            }}
                            sm="12"
                        >
                            <div className="input-group">
                                <Controller
                                    name="searchTerm"
                                    control={control}
                                    render={({ field }) => <Input placeholder="Enter search term..." {...field} />}
                                />
                                <Button className="Search" type="submit" size="lg">
                                    Submit
                                </Button>
                            </div>
                        </Col>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
};

export default SearchForm;