import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs } from "../store/bugs";

// New way (Functional Component)

const BugsFuncComponent = () => {
  const dispatch = useDispatch();
  const bugs = useSelector((state) => state.entities.bugs.list);

  useEffect(() => {
    dispatch(loadBugs());
  }, []);

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug.id}>{bug.description}</li>
      ))}
    </ul>
  );
};

export default BugsFuncComponent;
