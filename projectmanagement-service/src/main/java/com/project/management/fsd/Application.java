package com.project.management.fsd;

import java.util.Arrays;
import java.util.List;

import org.dozer.DozerBeanMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import com.project.management.fsd.filter.CORSFilter;


/**
 * 
 * @author Admin : Nawap Patel - nawap_patel@yahoo.com
 *
 */

@SpringBootApplication
@ComponentScan(basePackages = "com.project.management.fsd")
public class Application extends SpringBootServletInitializer {
 
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public FilterRegistrationBean<CORSFilter> corsFilter() {
		FilterRegistrationBean<CORSFilter> registrationBean = new FilterRegistrationBean<CORSFilter>();

		registrationBean.setFilter(new CORSFilter());
		registrationBean.addUrlPatterns("/*");

		return registrationBean;
	}
	
	@Bean
	public DozerBeanMapper dozerMapper() {
		List<String> mappingFiles = Arrays.asList("mapper-dozer.xml");
		DozerBeanMapper dozerBean = new DozerBeanMapper();
		dozerBean.setMappingFiles(mappingFiles);
		return dozerBean;
	} 
	
}
