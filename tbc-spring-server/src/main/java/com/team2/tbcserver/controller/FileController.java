package com.team2.tbcserver.controller;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.team2.tbcserver.mapper.FileMapper;
import com.team2.tbcserver.vo.FileVO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/project/file")
public class FileController {

	@Autowired
	FileMapper mapper;

	@GetMapping
	public List<FileVO> fetch() {
		System.out.println(mapper.fetch());
		return mapper.fetch();
	}

	@GetMapping("/{id}")
	public FileVO fetchBy(@PathVariable Long id) {
		System.out.println(id + " : " + mapper.fetchBy(id));
		return mapper.fetchBy(id);
	}

//	@PostMapping(consumes = {MediaType.ALL_VALUE, MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	@PostMapping(consumes = { MediaType.ALL_VALUE })
	public Long insert(@RequestParam("file") MultipartFile file) {
		System.out.println("FileController.insert ");
		Long result = 0L;
		
		try {
			byte[] data = file.getBytes();
			String contentType = file.getContentType();
			String fileName = file.getOriginalFilename();
//			InputStream in = file.getInputStream();
//			String name = file.getName();
//			Resource res = file.getResource();
//			Long size = file.getSize();
			
			FileVO item = new FileVO();
			item.setName(fileName);
			item.setType(contentType);
			item.setData(data);
			final LocalDateTime now = LocalDateTime.now();
			item.setCreatedAt(now);
			item.setUpdatedAt(now);
			
			// SELECT OCTET_LENGTH(data) FROM file WHERE id = 2;
			mapper.insert(item);
			result = item.getId();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return result;
	}

	@PutMapping("/{id}")
	public void update(@RequestBody FileVO project, @PathVariable Long id) {
		mapper.update(project);
	}

	@DeleteMapping("/{id}")
	public void deleteBy(@PathVariable Long id) {
		mapper.deleteBy(id);
		System.out.println("id: " + id + " removeUser OK!");
	}

}
