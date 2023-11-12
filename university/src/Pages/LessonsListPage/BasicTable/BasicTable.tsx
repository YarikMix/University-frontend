import {Response} from "../../../Types";
import {TableInstance, useTable, usePagination} from "react-table"
import React, {useEffect, useMemo} from "react";
import "./BasicTable.sass"
import axios from "axios";
import {DOMEN, STATUSES} from "../../../Consts";
import {useSelectedLesson} from "../../../hooks/useSelectedLesson";
import {useLessonForm} from "../../../hooks/useLessonForm";
import {useToken} from "../../../hooks/useToken";
import CustomButton from "../../../Components/CustomButton/CustomButton";
import {variables} from "../../../utls/variables";
import {ru} from "../../../utls/momentLocalization";
import moment from "moment";
import {useLessons} from "../../../hooks/useLessons";
import {useQuery} from "react-query";
import {FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight} from "react-icons/fa6";
import {useDesktop} from "../../../hooks/useDesktop";



export const BasicTable = () => {


	const COLUMNS = [
		{
			Header: "№",
			accessor: "id"
		},
		{
			Header: "Статус",
			accessor: "status",
			Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
		},
		{
			Header: "Группы",
			accessor: "groups",
			Cell: ({ value }) => { return value.map(group => group.name).join(', ') }
		},
		{
			Header: "Дата создания",
			accessor: "date_created",
			Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
		},
		{
			Header: "Дата формирования",
			accessor: "date_of_formation",
			Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
		},
		{
			Header: "Дата завершения",
			accessor: "date_complete",
			Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
		},
		{
			Header: "Действие",
			Cell: ({ cell }) => (
				<CustomButton bg={variables.primary} text="Открыть" onClick={(e) => showModal(cell.row.values.id)}/>
			)
		}
	]


	const {setLesson} = useSelectedLesson()

	const {openForm} = useLessonForm()

	const {access_token} = useToken()

	const fetchLesson = async (id) => {

		const response: Response = await axios(`${DOMEN}/api/lessons/${id}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				'authorization': access_token
			}
		});

		if (response.status == 200)
		{
			setLesson(response.data)
		}

	}

	const showModal = async (id) => {
		await fetchLesson(id)
		openForm()
	}



	const {queryPageIndex, queryPageSize, totalCount, setLessonsPage, setLessonsPageSize, setLessonsPageTotalCount} = useLessons()

	const fetchLessonsData = async (page, pageSize) => {

		const offset = page * pageSize

		try {

			const response: Response = await axios(`${DOMEN}/api/lessons?offset=${offset}&limit=${pageSize}`, {
				method: "GET",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					'authorization': `${access_token}`
				}
			})

			return response.data

		} catch (e) {

		}

	}

	const { isLoading, error, data, isSuccess } = useQuery(
		['lessons', queryPageIndex, queryPageSize],
		() => fetchLessonsData(queryPageIndex, queryPageSize),
		{
			keepPreviousData: true,
		}
	);




	const tableColumns = useMemo(() => COLUMNS, [])

	const tableInstance = useTable<TableInstance>({
		columns:tableColumns,
		data: isSuccess ? data["lessons"] : [],
		initialState: {
			pageIndex: queryPageIndex,
			pageSize: queryPageSize
		},
		manualPagination: true,
		pageCount: isSuccess ? Math.ceil(totalCount / queryPageSize) : null,
	}, usePagination)


	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		canNextPage,
		previousPage,
		canPreviousPage,
		gotoPage,
		pageCount,
		state: { pageIndex, pageSize },
		prepareRow,
		columns,
	} = tableInstance



	const {isDesktopLarge} = useDesktop()

	const updateMedia = () => {
		columns.find(c => c.id == "date_created").toggleHidden(!isDesktopLarge)
		columns.find(c => c.id == "date_of_formation").toggleHidden(!isDesktopLarge)
		columns.find(c => c.id == "date_complete").toggleHidden(!isDesktopLarge)
	}

	useEffect(() => {
		updateMedia();
	}, [isDesktopLarge]);



	useEffect(() => {
		setLessonsPage(pageIndex);

	}, [pageIndex]);

	useEffect(() => {
		setLessonsPageSize(pageSize);
		gotoPage(pageCount - 1);
	}, [pageSize, gotoPage]);

	useEffect(() => {

		if (data != undefined)
		{
			setLessonsPageTotalCount(data["totalCount"])
		}

	}, [data]);


	if (error) {
		return <p>Error</p>;
	}

	if (isLoading) {
		return <p>Loading...</p>;
	}


	return (
		<div className="table-wrapper">

			<table {...getTableProps()} className="lessons-table">
				<thead>
				{
					headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map( (column: any) => (
								<th {...column.getHeaderProps()}>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))
				}
				</thead>
				<tbody {...getTableBodyProps()}>
				{
					page.map(row => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map(cell => {
									return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
								})}
							</tr>
						)
					})
				}
				</tbody>
			</table>

			<div className="pagination-wrapper">

				<div className="pagination-container">
					<button className="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
						<FaAnglesLeft />
					</button>

					<button className="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
						<FaAngleLeft />
					</button>

					<div className="links-container">

						{pageIndex >= 3 &&
							<button className="button" onClick={() => gotoPage(0)}>
								{1}
							</button>
						}

						{pageIndex >= 3 &&
							<span>...</span>
						}

						{pageIndex >= 1 &&
                            <button className="button" onClick={() => gotoPage(pageIndex - 1)}>
								{ pageIndex }
                            </button>
						}

						<button className="button selected" onClick={() => gotoPage(pageIndex)}>
							{ pageIndex + 1 }
						</button>

						{pageIndex < pageCount - 1 &&
                            <button className="button" onClick={() => gotoPage(pageIndex + 1)}>
								{ pageIndex + 2 }
                            </button>
						}

						{ pageIndex <= pageCount - 3 &&
							<span>...</span>
						}

						{ pageIndex <= pageCount - 3 &&
							<button className="button" onClick={() => gotoPage(pageCount - 1)}>
								{ pageCount }
							</button>
						}

					</div>

					<button className="button" onClick={() => nextPage()} disabled={!canNextPage}>
						<FaAngleRight />
					</button>

					<button className="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
						<FaAnglesRight />
					</button>

				</div>

			</div>

		</div>
	)
}