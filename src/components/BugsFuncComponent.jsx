import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, resolveBug } from "../store/bugs";

// New way (Functional Component)

const BugsFuncComponent = () => {
  const dispatch = useDispatch();
  const bugs = useSelector((state) => state.entities.bugs.list);
  //or ==> useSelector(getUnresolvedBugs);

  useEffect(() => {
    dispatch(loadBugs());
  }, [dispatch]);

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug.id} style={{ padding: "1rem 0" }}>
          {bug.description} {"==>"} {`${bug.resolved}`}{" "}
          <span>
            <button onClick={() => dispatch(resolveBug(bug.id))}>
              {"Resolved"}
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default BugsFuncComponent;
