package edu.fiu.ffqr.models;

import java.io.Serializable;
import java.lang.reflect.Constructor;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

public class Children implements Serializable {
    
    @JsonProperty("name")
	private String name;
    @JsonProperty("weightLengthDataByMonth")
    private ArrayList<ArrayList<String>> weightLengthDataByMonth = new ArrayList<>();
    @JsonProperty("gender")
    private String gender;


    public Children() {
    }


    

    public Children(String name, ArrayList<ArrayList<String>> monthWeightLengthData) {
        this.name = name;
        this.weightLengthDataByMonth = monthWeightLengthData;
    }


    


    public String getGender() {
        return gender;
    }




    public void setGender(String gender) {
        this.gender = gender;
    }




    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public ArrayList<ArrayList<String>> getMonthWeightLengthData() {
        return weightLengthDataByMonth;
    }


    public void setMonthWeightLengthData(ArrayList<ArrayList<String>> monthWeightLengthData) {
        this.weightLengthDataByMonth = monthWeightLengthData;
    }

    
    

}
