let submitButton = document.getElementById("submit");
let updateButton = document.getElementById("update");
let editButtons = document.querySelectorAll("#edit");
let deleteButton = document.getElementById("delete");   // hvatanje buttona

if (submitButton) {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const myForm = document.querySelector("form");
    const data = new FormData(myForm);
    fetch("controller/db/Insert.php", {
      method: "post",
      body: data,
    })
      .then((res) => res.text())
      .then((res) => (window.location.href = "./index.php"));
  });
}

if (updateButton) {
  const id = window.location.search.substr(4);
  updateButton.addEventListener("click", (e) => {
    const myForm = document.querySelector("form");
    if (checkInputFields(myForm)) {
      e.preventDefault();
      const data = new FormData(myForm);
      fetch("controller/db/Edit.php?id=" + id, {
        method: "post",
        body: data,
      })
        .then((res) => res.text())
        .then((res) => (window.location.href = "./index.php"));
    }
  });
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("controller/db/Delete.php?id=" + id)
      .then((res) => res.text())
      .then((res) => (window.location.href = "./index.php"));
  });
}
Array.from(editButtons).map((edit) => {
  edit.addEventListener("click", (e) => {
    e.preventDefault();
    let { id } = JSON.parse(edit.dataset.info);
    console.log(id);
    window.location.href = "./editFighter.php?id=" + id;
  });
});



const checkInputFields = (form) => {
  if (
    form.querySelector("input[name='name']").value &&
    form.querySelector("input[name='age']").value &&
    form.querySelector("input[name='info']").value &&
    form.querySelector("input[name='wins']").value &&
    form.querySelector("input[name='loss']").value
  )
    return true;
  return false;
};

let firstSide = document.getElementById("firstSide");
let boxes_one = firstSide.querySelectorAll(".fighter-box");
let cat_one = firstSide.querySelector(".cat-info");
let dataFirst;

let secondSide = document.getElementById("secondSide");
let boxes_two = secondSide.querySelectorAll(".fighter-box");
let cat_two = secondSide.querySelector(".cat-info");
let dataSecond;

let fight_info_element = document.querySelector("#fight-info");
fight_info_element.prepend(document.createElement("p"));
fight_info_element.children[0].classList.add("font-weight-bold");
let fightButton = document.querySelector("#generateFight");
fightButton.disabled = true;
let addButton = document.querySelector("#addNew");
addButton.addEventListener("click", () => {
  window.location.href = "./addFighter.php";
});
let randomButton = document.querySelector("#randomFight");

let all_boxes = document.querySelectorAll(".fighter-box");

Array.from(boxes_one).map((fighter_box) => {
  fighter_box.addEventListener("click", () => {
    dataFirst = JSON.parse(fighter_box.dataset.info);
    setActiveFighter(cat_one, dataFirst, firstSide, fighter_box);
    disableSameFighter(boxes_two, dataFirst);
    checkIfCanFight();
  });
});

Array.from(boxes_two).map((fighter_box) => {
  fighter_box.addEventListener("click", () => {
    dataSecond = JSON.parse(fighter_box.dataset.info);
    setActiveFighter(cat_two, dataSecond, secondSide, fighter_box);
    disableSameFighter(boxes_one, dataSecond);
    checkIfCanFight();
  });
});

const setActiveFighter = (cat_info, cat_data, side, fighter_box) => {
  let this_side_boxes = side.querySelectorAll(".fighter-box");
  Array.from(this_side_boxes).map((fighter_box) => {
    fighter_box.children[0].style.border = "none";
  });
  fighter_box.children[0].style.border = "black 5px solid";

  cat_info.querySelector(".name").innerHTML = cat_data.name;
  cat_info.querySelector(".age").innerHTML = cat_data.age;
  cat_info.querySelector(".skills").innerHTML = cat_data.catInfo;

  let record = cat_info.querySelector(".record");
  record.children[0].innerHTML = cat_data.record.wins;
  record.lastChild.innerHTML = cat_data.record.loss;

  side.querySelector(".featured-cat-fighter-image").src =
    fighter_box.children[0].src;
};

const checkIfCanFight = () => {
  if (dataFirst && dataSecond)
    document.querySelector("#generateFight").disabled = false;
};

const disableSameFighter = (other_side_boxes, this_side_data) => {
  Array.from(other_side_boxes).map((fighter_box) => {
    let fighter_data = JSON.parse(fighter_box.dataset.info);
    if (fighter_data.id === this_side_data.id) {
     
      fighter_box.style.pointerEvents = "none";
    } else {
      
      fighter_box.style.pointerEvents = "auto";
    }
  });
};

const fight = () => {
  let probability_one =
    (dataFirst.record.wins / (dataFirst.record.wins + dataFirst.record.loss)) *
    100;
  let probability_two =
    (dataSecond.record.wins / (dataSecond.record.wins + dataSecond.record.loss)) *
    100;
  let advantage = {};
  let winner;
  let difference = Math.abs(probability_one - probability_two);
  if (difference <= 10) advantage["percent"] = 0.1;
  else advantage["percent"] = 0.2;

  if (probability_one > probability_two) advantage["fighter"] = "first";
  else advantage["fighter"] = "second";

  let simulation = Math.random().toFixed(2);
  if (advantage.fighter === "first") {
    if (simulation < advantage.percent + 0.5) winner = "first";
    else winner = "second";
  } else if (advantage.fighter === "second") {
    if (simulation > 0.5 - advantage.percent) winner = "second";
    else winner = "first";
  }

  if (winner === "first") {
    updateData(dataFirst, dataSecond, winner);
    fight_info_element.children[0].innerHTML = dataFirst.name +" is the winner";
  } else {
    updateData(dataSecond, dataFirst, winner);
    fight_info_element.children[0].innerHTML = dataSecond.name +" is the winner";
  }

  Array.from(all_boxes).map((fighter_box) => {
    
    fighter_box.style.pointerEvents = "auto";
    fighter_box.children[0].style.border = "none";
  });

  let cat_imgs = document.querySelectorAll(".featured-cat-fighter-image");
  Array.from(cat_imgs).map((img, i) => {
    let isWinner =
      (winner === "first" && i === 0) || (winner === "second" && i === 1);
    img.style.border = `${isWinner ? "green" : "red"} 5px solid`;
  });
  disableSameFighter(boxes_one, dataSecond);
  disableSameFighter(boxes_two, dataFirst);
  fightButton.disabled = false;
  randomButton.disabled = false;
  addButton.disabled = false;
  Array.from(editButtons).map((edit) => {
    edit.disabled = false;
  });
};

const updateData = (winner_data, loser_data, winner) => {
  let updated_data_winner = {
    ...winner_data,
    record: {
      wins: winner_data.record.wins++,
      ...winner_data.record,
    },
  };

  let updated_data_loser = {
    ...loser_data,
    record: {
      loss: loser_data.record.loss++,
      ...loser_data.record,
    },
  };

  let data = new FormData();
  data.append("id", updated_data_winner.id);
  data.append("wins", updated_data_winner.record.wins);
  data.append("loss", updated_data_winner.record.loss);
  fetch("controller/db/Update.php", {
    method: "post",
    body: data,
  }).then((res) => res.text());

  data = new FormData();
  data.append("id", updated_data_loser.id);
  data.append("wins", updated_data_loser.record.wins);
  data.append("loss", updated_data_loser.record.loss);
  fetch("controller/db/Update.php", {
    method: "post",
    body: data,
  }).then((res) => res.text());

  if (winner === "first") {
    dataFirst = updated_data_winner;
    dataSecond = updated_data_loser;
  } else {
    dataFirst = updated_data_loser;
    dataSecond = updated_data_winner;
  }

  Array.from(boxes_one).map((fighter_box) => {
    updateDataAttribute(fighter_box);
  });
  Array.from(boxes_two).map((fighter_box) => {
    updateDataAttribute(fighter_box);
  });
};

const updateDataAttribute = (fighter_box) => {
  let data = JSON.parse(fighter_box.dataset.info);
  if (data.id === dataFirst.id) {
    setActiveFighter(cat_one, dataFirst, firstSide, fighter_box);
    fighter_box.setAttribute("data-info", JSON.stringify(dataFirst));
  }
  if (data.id === dataSecond.id) {
    setActiveFighter(cat_two, dataSecond, secondSide, fighter_box);
    fighter_box.setAttribute("data-info", JSON.stringify(dataSecond));
  }
};

fightButton.addEventListener("click", () => {
  fightButton.disabled = true;
  randomButton.disabled = true;
  addButton.disabled = true;
  Array.from(editButtons).map((edit) => {
    edit.disabled = true;
  });
  Array.from(all_boxes).map((fighter_box) => {
    
    fighter_box.style.pointerEvents = "none";
  });
  let timer = 3;
  let interval = setInterval(() => {
    timer--;
  }, 1000);
  setTimeout(() => {
    clearInterval(interval);
    fight();
  }, 3000);
});

const randomFighters = () => {
  fetch("controller/db/SelectAll.php")
    .then((res) => res.json())
    .then((res) => {
      let ids = [];
      res.map((cat) => {
        ids.push(cat.id);
      });
      let randomId1, randomId2;
      do {
        randomId1 =
          Math.floor(Math.random() * Math.max(...ids)) + Math.min(...ids);
      } while (!ids.includes(randomId1.toString()));
      do {
        randomId2 =
          Math.floor(Math.random() * Math.max(...ids)) + Math.min(...ids);
      } while (randomId2 === randomId1 || !ids.includes(randomId2.toString()));
      Array.from(boxes_one).map((fighter_box) => {
        let data = JSON.parse(fighter_box.dataset.info);
        if (data.id == randomId1) {
          dataFirst = data;
          setActiveFighter(cat_one, dataFirst, firstSide, fighter_box);
          disableSameFighter(boxes_two, dataFirst);
        }
      });
      Array.from(boxes_two).map((fighter_box) => {
        let data = JSON.parse(fighter_box.dataset.info);
        if (data.id == randomId2) {
          dataSecond = data;
          setActiveFighter(cat_two, dataSecond, secondSide, fighter_box);
          disableSameFighter(boxes_one, dataSecond);
        }
      });
      checkIfCanFight();
    });
};
randomButton.addEventListener("click", randomFighters);


