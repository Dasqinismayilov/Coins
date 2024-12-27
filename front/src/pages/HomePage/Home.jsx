import { useEffect, useState } from "react"
import { getCategories } from '../../API/Api'
import './Home.css';
import Search from "../../Components/Search/Search";

import CategoryPage from "../CategoryPage/CategoryPage";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

const HomePage = () => {

    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        getCategories().then(data => {
            // console.log(data)
            setCategories(data)
        })
    }, [])


    const [submitPressed, setSubmitPressed] = useState(false)
    const navigate = useNavigate();
    const location = useLocation()
   
    const [searchParams, setSearchParams] = useSearchParams();
    
    useEffect(() => {
        if (submitPressed) {
            //Axtarış səhifəsinə keçek
            navigate(
                '/search' + location.search, { replace: true });
            setSubmitPressed(false);
        }
    }, [submitPressed, location.search, navigate]);

    const submitForm = (values) => {
        setSubmitPressed(true)
        setSearchParams(values)
    }



    return (

        <div>
            <h1>Home Page</h1>
            <Link to={"/admin"}>Admin Panel</Link>
            <Search submitForm={(formValues) => submitForm(formValues)} />
            <CategoryPage categories={categories} />
        </div>
    )
}

export default HomePage






