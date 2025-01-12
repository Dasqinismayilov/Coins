import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { getSearch } from '../../API/Api'
import "./ListOfCoins.css"
import Search from "../../Components/Search/Search"


const ListOfCoins = () => {

    const params = useParams()
    const { id } = params;
    const [coins, setCoins] = useState([])

    useEffect(() => {
        getSearch(id, "").then(data => {
            setCoins(data)
        })
    }, [id])

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
            <h1>List Of Coins</h1>

            <p className="to-home">
                <Link to={"/"}>Homepage</Link>— List of the coins
            </p>

            <Search submitForm={submitForm} />


            <div className="list">
                {coins.map(item => (
                    //CoinDetail-ə keçirik     category/id/:coinId
                    <Link to={`/products/${item.id}`} key={item.id}>
                        <div className="list-coins" >
                            <div>
                                <img className="list-image" src={item.image} alt="category pic" />
                            </div>
                            <div>
                                <p className="list-title">{item.title}</p>
                                <p className="list-short-desc">{item.short_desc}</p>
                            </div>
                        </div>
                    </Link>
                ))
                }
            </div>
        </div>
    )
}

export default ListOfCoins



