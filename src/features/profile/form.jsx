import React, { useState, useRef } from "react";

import useForm from "../../hooks/use-form";

import Dropdown from "../../ui/dropdown";
import TextField from "../../ui/text-field";
import Button from "../../ui/button";

import weightClasses from "../../data/weight-classes.json";
import genders from "../../data/genders.json";
import communities from "../../data/communities.json";

import { apiFetch } from "../../modules/api-fetch";
import { toValueLabel } from "../../modules/object";
import { isRequired, isValidAge, isPassword } from "../../modules/validations";

import "./styles.css";

// filter out open weight class
const filteredWeightClasses = toValueLabel(weightClasses).filter(
  (obj) => obj.value !== "OpenWeight"
);

const validations = {
  firstName: [isRequired],
  lastName: [isRequired],
  birthYear: [isValidAge],
  school: [isRequired],
};

export default function EditProfileForm({ player }) {
  const [values, setValues] = useState(player);
  const { errors, setErrors, valid, validate } = useForm({
    validations,
    values,
  });
  const fileRef = useRef();

  function imageChanged() {
    const file = fileRef.current && fileRef.current.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setValues((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    apiFetch(`players/${localStorage.getItem("playerId")}`, 'patch', values)
      .then((json) => {
        if (json.errors) {
          const errors = Object.keys(json.errors).reduce((acc, key) => {
            acc[key] = [json.errors[key].message];
            return acc;
          }, {});
          setErrors((prev) => ({
            ...prev,
            ...errors,
          }));
          return
        }
        window.location = `/profiles/${localStorage.getItem("playerId")}`
      })
      .catch((error) => {
        debugger;
      });
  }

  return (
    <>
      <h1>Update my profile</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          label="First Name"
          value={values.firstName}
          validate={() => validate("firstName", validations["firstName"])}
          errors={errors.firstName}
          onChange={(val) => {
            const firstName = val;
            setValues((prev) => ({
              ...prev,
              firstName,
            }));
          }}
        />

        <TextField
          label="Last Name"
          value={values.lastName}
          validate={() => validate("lastName", validations["lastName"])}
          errors={errors.lastName}
          onChange={(val) => {
            const lastName = val;
            setValues((prev) => ({
              ...prev,
              lastName,
            }));
          }}
        />

        <TextField
          label="Year of Birth"
          value={values.birthYear}
          validate={() => validate("birthYear", validations["birthYear"])}
          errors={errors.birthYear}
          onChange={(birthYear) =>
            setValues((prev) => ({
              ...prev,
              birthYear,
            }))
          }
        />

        <div>
          <label>Avatar</label>
          <div>
            <input type="file" ref={fileRef} onChange={imageChanged} />
          </div>
          {values.avatar ? (
            <div>
              <img src={values.avatar} alt="" width={100} />{" "}
            </div>
          ) : (
              ""
            )}
        </div>

        <Dropdown
          options={toValueLabel(communities)}
          onChange={(val) => {
            const community = val;
            setValues((prev) => ({
              ...prev,
              community,
            }));
          }}
          value={values.community}
        />

        <Dropdown
          options={filteredWeightClasses}
          onChange={(val) => {
            const weightClass = val;
            setValues((prev) => ({
              ...prev,
              weightClass,
            }));
          }}
          value={values.weightClass}
        />

        <Dropdown
          options={toValueLabel(genders)}
          onChange={(val) => {
            const gender = val;
            setValues((prev) => ({
              ...prev,
              gender,
            }));
          }}
          value={values.gender}
        />

        <TextField
          label="Update Your School Name"
          value={values.school}
          validate={() => validate("school", validations["school"])}
          errors={errors.school}
          onChange={(val) => {
            const school = val;
            setValues((prev) => ({
              ...prev,
              school,
            }));
          }}
        />

        <Button type="submit" disabled={!valid()}>Update Profile</Button>
      </form>
    </>
  );
}
