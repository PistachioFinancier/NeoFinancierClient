import React, { Fragment, useState } from "react";
import Searchbar from "./Searchbar";
import CategorySelector from "./CategorySelector";
import Consultants from "./Consultants";
import { Button } from "antd";

function getSampleData() {
  const sampleData = [
    {
      company: "ABMS",
      category: "Land Surveyors"
    },
    {
      company: "dasf",
      category: "Land Surveyors"
    },
    {
      company: "xzcv",
      category: "Land Surveyors"
    },
    {
      company: "wqer",
      category: "Quantity Surveyors"
    },
    {
      company: "wey",
      category: "Quantity Surveyors"
    },
    {
      company: "xczvgs",
      category: "Quantity Surveyors"
    },
    {
      company: "ABbgfhMS",
      category: "Quantity Surveyors"
    },
    {
      company: "eqyet",
      category: "Quantity Surveyors"
    },
    {
      company: "lkjhfdkl",
      category: "Quantity Surveyors"
    },
    {
      company: "tyiutijh,b",
      category: "Land Surveyors"
    },
    {
      company: "hjjdsdas",
      category: "Quantity Surveyorsr"
    },
    {
      company: "weryfnb",
      category: "Land Surveyors"
    },
    {
      company: "uyfkjg",
      category: "Quantity Surveyors"
    },
    {
      company: "nbyiuy",
      category: "Lawyers"
    },
    {
      company: "gfhjsewrd",
      category: "Lawyers"
    },
    {
      company: "zxvfewqrtsdgj",
      category: "Lawyers"
    },
    {
      company: "ghjythsdfgad",
      category: "Lawyers"
    },
    {
      company: "ewrtdsvcxchtf",
      category: "Lawyers"
    },
    {
      company: "ioyghngfhdtr",
      category: "Lawyers"
    },
    {
      company: "thdgbvnhj",
      category: "Lawyers"
    },
    {
      company: "iytoyujmgfhndt",
      category: "quantity surveyor"
    },
    {
      company: "ertsffsdaer",
      category: "Quantity Surveyors"
    },
    {
      company: "qasfdzxvcdfs",
      category: "Quantity Surveyors"
    },
    {
      company: "qqqqqqqqqqwer",
      category: "Quantity Surveyors"
    },
    {
      company: "dzxvcccccccxcz",
      category: "Engineers"
    },
    {
      company: "xcvvvvvvvvvvvvvcx",
      category: "Engineers"
    },
    {
      company: "xcvxzcvzzzzz",
      category: "Appraisers"
    },
    {
      company: "wqebcvbcxvcbvr",
      category: "Appraisers"
    },
    {
      company: "wevbcvnytyy",
      category: "Appraisers"
    }
  ];

  return sampleData;
}

function ConsultantList() {
  const sampleData = getSampleData();

  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const [searchFilter, setSearchFilter] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Appraisers");

  const consultantCategories = [
    "Appraisers",
    "Engineers",
    "Land Surveyors",
    "Lawyers",
    "Quantity Surveyors"
  ];

  return (
    <Fragment>
      <CategorySelector
        setSelectedCategory={setSelectedCategory}
        consultantCategories={consultantCategories}
      ></CategorySelector>
      <Searchbar setSearchFilter={setSearchFilter}></Searchbar>
      <Consultants
        selectedCompanies={selectedCompanies}
        setSelectedCompanies={setSelectedCompanies}
        data={sampleData.filter(
          consultant =>
            consultant.category === selectedCategory &&
            consultant.company
              .toUpperCase()
              .includes(searchFilter.toUpperCase())
        )}
      ></Consultants>
      <Button
        onClick={() => console.log(selectedCompanies)}
        disabled={selectedCompanies.length === 0}
      >
        Proceed
      </Button>
    </Fragment>
  );
}

export default ConsultantList;
