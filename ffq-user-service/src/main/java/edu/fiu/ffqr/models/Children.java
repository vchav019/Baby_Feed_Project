package edu.fiu.ffqr.models;

import java.io.Serializable;
import java.lang.reflect.Constructor;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

public class Children implements Serializable {
    
    @JsonProperty("name")
	private String name;
    
    @JsonProperty("gender")
    private String gender;
    
    @JsonProperty("weightLengthDataByMonth")
    private ArrayList<ArrayList<String>> weightLengthDataByMonth = new ArrayList<>();
    


    public Children() {
    }
 

    public Children(String name, String gender, ArrayList<ArrayList<String>> weightLengthDataByMonth) {
        this.name = name;
        this.gender = gender;
        this.weightLengthDataByMonth = weightLengthDataByMonth;
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
