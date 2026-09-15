# VA.Lab

Website for the Georgia Tech Visual Analytics Lab, deployed at <https://gtvalab.github.io/>

Last updated: August 2024

## Setup and run

- Start a local server, e.g., using Python (`python -m http.server 8000`)
- Open browser to <http://localhost:8000>

## Updating your information

To add/modify/remove content:

1. Navigate to the [data](data) folder.
2. Open the [README](data/README.md) file.

## Steps to make edits

If you are unfamiliar with forking and submitting pull requests,
[here is a 4-minute guide](https://guides.github.com/activities/forking/) to get you started.

1. Fork this repository.
2. Make your edits on the `master` branch of the forked repository and commit them.
3. Submit a Pull Request on the original (non-forked) repository, from your forked repository's `master` branch to the
   original repository's `master` branch, and an admin will merge it.

## How to sync your forked repo with the original lab repo

If your local machine doesn't track the original repo, add it as a remote and fetch it:
```
git remote add valab-original https://github.com/gtvalab/gtvalab.github.io.git
git fetch valab-original
```

Confirm your remotes are set up correctly by running `git remote -v`. You should see something similar to:

```
origin  git@github.com:[YourUserName]/gtvalab.github.io.git (fetch)
origin  git@github.com:[YourUserName]/gtvalab.github.io.git (push)
valab-original  https://github.com/gtvalab/gtvalab.github.io.git (fetch)
valab-original  https://github.com/gtvalab/gtvalab.github.io.git (push)
```

After your Pull Request is merged, sync your fork back to the lab repo.

> Warning: step 2 discards any local commits on `master` that aren't in the lab repo.

1. `git fetch valab-original`
2. `git reset --hard valab-original/master`
3. `git push --force-with-lease origin master`

## Contact

- endert \[at\] gatech \[dot\] edu
