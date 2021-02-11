import React, { useState, useRef } from 'react';

import useForm from '../../hooks/use-form';
import imageUpload from '../../hooks/image-upload';

import Dropdown from '../../ui/dropdown';
import TextField from '../../ui/text-field';
import Button from '../../ui/button';

import weightClasses from '../../data/weight-classes.json';
import genders from '../../data/genders.json';
import communities from '../../data/communities.json';

import { apiFetch } from '../../modules/api-fetch';
import { toValueLabel } from '../../modules/object';
import { isRequired, isValidAge } from '../../modules/validations';

import './styles.css';


// filter out open weight class
const filteredWeightClasses = toValueLabel(weightClasses).filter(
  (obj) => obj.value !== 'OpenWeight'
);

const validations = {
  firstName: [isRequired],
  lastName: [isRequired],
  birthYear: [isValidAge],
  school: [isRequired],
  email: [isRequired]
};

export default function EditProfileForm({ player }) {
  const [values, setValues] = useState(player);
  const { errors, setErrors, valid, validate } = useForm({
    validations,
    values,
  });
  const fileRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    apiFetch(`players/${localStorage.getItem('playerId')}`, 'patch', values)
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
          return;
        }
        window.location = `/profiles/${localStorage.getItem('playerId')}`;
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function deletePlayer(playerId) {
    apiFetch(`players/${localStorage.getItem('playerId')}`, 'delete', {
      playerId,
    })
      .then((json) => {
        if (json.errors) {
          return;
        }
        localStorage.removeItem('jwt');
        window.location = '/';
      })
      .catch((error) => {
        console.log(error)
      });
  }



  return (
    <>
      <div className="update-profile-wrapper">
        <h1>Update my profile</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="First Name"
            value={values.firstName}
            validate={() => validate('firstName', validations['firstName'])}
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
            validate={() => validate('lastName', validations['lastName'])}
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
            label="Email"
            value={values.email}
            validate={() => validate('email', validations['email'])}
            errors={errors.email}
            onChange={(val) => {
              const email = val;
              setValues((prev) => ({
                ...prev,
                email,
              }));
            }}
          />

          <TextField
            label="Year of Birth"
            value={values.birthYear}
            validate={() => validate('birthYear', validations['birthYear'])}
            errors={errors.birthYear}
            onChange={(birthYear) =>
              setValues((prev) => ({
                ...prev,
                birthYear,
              }))
            }
          />

          <TextField
            label="Update Your School Name"
            value={values.school}
            validate={() => validate('school', validations['school'])}
            errors={errors.school}
            onChange={(val) => {
              const school = val;
              setValues((prev) => ({
                ...prev,
                school,
              }));
            }}
          />

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

          <div className="avatar-wrapper">
            <h5>Avatar</h5>
            {values.avatar ? (
              <div className="img-zone">
                <img src={values.avatar} alt="" width={130} height={140} />{' '}
              </div>
            ) : (
                ''
              )}
            <div>
              <input type="file" ref={fileRef} onChange={e => imageUpload(fileRef, setValues)} />
            </div>
          </div>
          <div className="action-wrapper">
            <Button
              className="action"
              onClick={() => deletePlayer(localStorage.getItem('playerId'))}
            >
              Delete
            </Button>
            <Button
              className="action"
              isSecondary={true}
              type="submit"
              disabled={!valid()}
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>

    </>
  );
}
