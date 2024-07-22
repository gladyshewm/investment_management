import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./ManagePortfolios.css";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import Loading from "../../components/Loading/Loading";
import Table from "../../components/Table/Table";
import { COLUMNS } from "../../components/Table/portfolio-manage_columns";
import user from "../../api/user";
import PlusIcon from "../../components/UI/icons/PlusIcon";
import BriefCaseIcon from "../../components/UI/icons/BriefCaseIcon";

const ManagePortfolios = () => {
    const columns = useMemo(() => COLUMNS, []);
    const [isLoading, setIsLoading] = useState(true);
    const [portfolios, setPortfolios] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const id = await user.getUserId();
                const userPortfolios = await user.getPortfolios(id);

                setPortfolios(userPortfolios);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching portfolios:', error.message);
            }
        }
        fetch();
    }, []);

    return (
        <div className="manage-main">
            <Sidebar />
            {isLoading ? (<Loading />) : (
                <div className="manage-block">
                    <div className="manage-block__wrapper">
                        {console.log(portfolios.error)}
                        {portfolios.error ?
                            <div className="not-found__wrapper">
                                <div className="not-found">
                                    <span>Портфели отсутствуют</span>
                                    <Link to="/create-portfolio">
                                        Создать портфель
                                        <BriefCaseIcon stroke={"currentColor"} />
                                    </Link>
                                </div>
                            </div> :
                            <>
                                <div className="manage-block__header">
                                    <span className="manage-block__title">Управление портфелями</span>
                                    <div className="add-block">
                                        <Link to="/create-portfolio">
                                            <PlusIcon stroke={"currentColor"} />
                                            <span>Добавить портфель</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="manage-block__main">
                                    <div className="manage-block__content">
                                        <Table
                                            columns={columns}
                                            data={portfolios}
                                        />
                                    </div>
                                </div>
                            </>
                        }

                    </div>

                </div>
            )}
        </div>
    )
};

export default ManagePortfolios;
