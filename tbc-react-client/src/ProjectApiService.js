import Axios from 'axios';
import FileDB from './HttpCommon';
import { Component } from 'react';

// front-end : port 3000
// back-end : port 8090 로 설정.

// spring boot back-end url.
const URL = 'http://localhost:8090/project'; // https는 따로 알아보자.
const URL2 = 'http://localhost:8090/discover'; // https는 따로 알아보자.

const URL3 = 'http://localhost:8090/discover/count'; 

class ProjectApiService extends Component {

	/////////////////////////////////////////
	// Project table

	// http://localhost:8090/project
	// 전체 프로젝트들 가져오기
	fetch() {
		return Axios.get(URL);
	}

	// http://localhost:8090/project/1
	// id인 프로젝트 가져오기
	fetchBy(id) {
		return Axios.get(URL + '/' + id);
	}

	// 프로젝트 추가
	insert(project) {
		return Axios.post(URL, project);
	}

	// 프로젝트 갱신
	update(project) {
		return Axios.put(URL + '/' + project.id, project);
	}

	// id인 프로젝트 삭제.
	delete(id) {
		return Axios.delete(URL + '/' + id);
	}

	// project 테이블에서 columnName 값들을 구한다.
	getColumn(columnName) {
		return Axios.get(URL + '/col/' + columnName);
	}

	// project 테이블에서 columnName 값들을 구한다.
	getColumnBy(columnName, id) {
		return Axios.get(URL + '/col/' + columnName + '/'+id);
	}

	/////////////////////////////////////////
	// File table

	// upload project image file.
	upload(file) {
		console.log('upload...', file);
		let formData = new FormData();
		formData.append('file', file);
		return FileDB.post('', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	}

	// download project image file.
	getFile(fileId) {
		console.log('getFile...', fileId);
		return FileDB.get('/' + fileId);
	}

	updateFile(file, id) {
		console.log('update...', file, id);
		let formData = new FormData();
		formData.append('file', file);
		return FileDB.put('/' + id, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	}

	/////////////////////////////////////////
	// Category table
	getCategories() {
		console.log('getCategories...');
		return Axios.get(URL + '/category');
	}

	getCategory(id) {
		console.log('getCategory.id=', id);
		return Axios.get(URL + '/category/' + id);
	}

	/////////////////////////////////////////
	// Item table
	getItems() {
		console.log('getItems...');
		return Axios.get(URL + '/item');
	}

	getItem(id) {
		console.log('getItem.id=', id);
		return Axios.get(URL + '/item/' + id);
	}

	/////////////////////////////////////////
	// test table
	getData(table) {
		return Axios.get(URL + '/'+ table);
	}

	getDataBy(table, id) {
		return Axios.get(`${URL}/${table}/${id}`);
	}

	/////////////////////////////////////////
	//여기서부터 Discover에서 쓰는 것들//
	projectList() {
		return Axios.get(URL2);
	}

	countProject() {
		return Axios.get(URL3);
	}


}

export default new ProjectApiService();
