import React, { useState, useRef } from 'react';

import useForm from '../../hooks/use-form';

import Dropdown from '../../ui/dropdown';

import TextField from '../../ui/text-field';
import Button from '../../ui/button';

import weightClasses from '../../data/weight-classes.json';
import giScores from '../../data/gi-scores.json';
import nogiScores from '../../data/nogi-scores.json';
import genders from '../../data/genders.json';
import communities from '../../data/communities.json';

import { toValueLabel } from '../../modules/object';
import { isRequired, isValidAge, didAgree } from '../../modules/validations';
import { apiFetch } from '../../modules/api-fetch';

import './styles.css';

// filter out open weight class
const filteredWeightClasses = toValueLabel(weightClasses).filter(
  (obj) => obj.value !== 'OpenWeight'
);

const defaultValues = {
  firstName: '',
  lastName: '',
  birthYear: '',
  email: '',
  password: '',
  weightClass: '',
  school: '',
  gender: '',
  avatar: '',
  gi: '',
  nogi: '',
  community: '',
  acceptsTos: false,
};

const validations = {
  firstName: [isRequired],
  lastName: [isRequired],
  weightClass: [isRequired],
  community: [isRequired],
  gender: [isRequired],
  gi: [isRequired],
  nogi: [isRequired],
  birthYear: [isValidAge],
  email: [isRequired],
  password: [isRequired],
  school: [isRequired],
  acceptsTos: [didAgree],
};

export default function RegisterForm({ setComplete }) {
  const [values, setValues] = useState(defaultValues);
  const { errors, setErrors, valid, validate } = useForm({
    validations,
    values,
  });
  const fileRef = useRef();
  const [issue, setIssue] = useState(false);

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
    apiFetch(`players`, 'post', values)
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
        setComplete(true);
      })
      .catch((error) => {
        setIssue(true);
      });
  }

  return (
    <div className="register-wrapper">
      <h1>Competitor Registration</h1>
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
          label="Email"
          autoComplete="off"
          type="email"
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
          label="Password"
          type="password"
          autoComplete="off"
          value={values.password}
          validate={() => validate('password', validations['password'])}
          errors={errors.password}
          onChange={(val) => {
            const password = val;
            setValues((prev) => ({
              ...prev,
              password,
            }));
          }}
        />

        <TextField
          label="Enter Your School Name"
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
          options={filteredWeightClasses}
          onChange={(val) => {
            const weightClass = val;
            setValues((prev) => ({
              ...prev,
              weightClass,
            }));
          }}
          value={values.weightClass}
          validate={() => validate('weightClass', validations['weightClass'])}
          label="Select your competition weight class"
        />
        <div className="two-col">
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
            validate={() => validate('gender', validations['gender'])}
            label="What is your gender?"
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
            validate={() => validate('community', validations['community'])}
            label="Select your competition community"
          />
        </div>

        <h6>
          Dont't see your community? Contact <span>admin@rival-bjj.com</span>{' '}
          and we'll add your community.
        </h6>

        <div className="two-col">
          <Dropdown
            options={toValueLabel(giScores)}
            onChange={(val) => {
              const gi = val;
              setValues((prev) => ({
                ...prev,
                gi,
              }));
            }}
            value={values.gi}
            validate={() => validate('gi', validations['gi'])}
            label="Select your Gi experience"
          />

          <Dropdown
            options={toValueLabel(nogiScores)}
            onChange={(val) => {
              const nogi = val;
              setValues((prev) => ({
                ...prev,
                nogi,
              }));
            }}
            value={values.nogi}
            validate={() => validate('nogi', validations['nogi'])}
            label="Select your No Gi experience"
          />
        </div>

        <div className="avatar-wrapper">
          <h5>Avatar</h5>
          {values.avatar ? (
            <div className="img-zone">
              <img src={values.avatar} alt="" width={100} />{' '}
            </div>
          ) : (
              ''
            )}
          <div>
            <input type="file" ref={fileRef} onChange={imageChanged} />
          </div>
          <div className="accept-rule">
            <input
              type="checkbox"
              onChange={(e) => {
                const acceptsTos = e.target.checked;
                setValues((prev) => ({
                  ...prev,
                  acceptsTos,
                }));
              }}
              value={values.acceptsTos}
            />
            <span>I have read and agree to follow these <a href="/rules"> rules</a></span>
          </div>
        </div>
        {issue ? <div>sever error</div> : <></>}
        <Button type="submit" disabled={!valid()}>
          Register Your Profile
        </Button>
      </form>
    </div>
  );
}
